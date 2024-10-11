using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateaspnetuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Branch_BranchId",
                schema: "oss-ecommerce",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<int>(
                name: "BranchId",
                schema: "oss-ecommerce",
                table: "AspNetUsers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Branch_BranchId",
                schema: "oss-ecommerce",
                table: "AspNetUsers",
                column: "BranchId",
                principalSchema: "oss-ecommerce",
                principalTable: "Branch",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Branch_BranchId",
                schema: "oss-ecommerce",
                table: "AspNetUsers");

            migrationBuilder.AlterColumn<int>(
                name: "BranchId",
                schema: "oss-ecommerce",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Branch_BranchId",
                schema: "oss-ecommerce",
                table: "AspNetUsers",
                column: "BranchId",
                principalSchema: "oss-ecommerce",
                principalTable: "Branch",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
