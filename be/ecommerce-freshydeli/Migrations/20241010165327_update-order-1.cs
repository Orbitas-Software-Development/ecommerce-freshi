using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateorder1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Branch_BranchId",
                schema: "oss-ecommerce",
                table: "Order");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                schema: "oss-ecommerce",
                table: "Order",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Branch_BranchId",
                schema: "oss-ecommerce",
                table: "Order",
                column: "BranchId",
                principalSchema: "dbo",
                principalTable: "Branch",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Branch_BranchId",
                schema: "oss-ecommerce",
                table: "Order");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                schema: "oss-ecommerce",
                table: "Order",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Branch_BranchId",
                schema: "oss-ecommerce",
                table: "Order",
                column: "BranchId",
                principalSchema: "oss-ecommerce",
                principalTable: "Branch",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
