using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateorderentity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Signature",
                schema: "oss-ecommerce",
                table: "OrderDetails");

            migrationBuilder.AddColumn<string>(
                name: "SignatureBase64",
                schema: "oss-ecommerce",
                table: "Order",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SignatureBase64",
                schema: "oss-ecommerce",
                table: "Order");

            migrationBuilder.AddColumn<string>(
                name: "Signature",
                schema: "oss-ecommerce",
                table: "OrderDetails",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
